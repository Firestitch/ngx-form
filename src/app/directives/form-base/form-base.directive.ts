import {
  AfterContentInit,
  ChangeDetectorRef,
  ContentChildren,
  Directive,
  inject,
  Input,
  NgZone,
  OnDestroy,
  QueryList,
} from '@angular/core';

import { MatTabGroup } from '@angular/material/tabs';

import { Observable, of, Subject } from 'rxjs';
import { delay, filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';

import { ConfirmResult } from '../../enums';
import { confirmResultContinue } from '../../helpers';
import { ConfirmConfig } from '../../interfaces';
import { FsForm } from '../../services';
import { FsButtonDirective } from '../button.directive';
import { FsFormDirective } from '../form';


@Directive()
export abstract class FsFormBaseDirective implements AfterContentInit, OnDestroy {

  @Input()
  public confirmTabs = true;
  
  @Input()
  public tabGroup: MatTabGroup;

  protected _ngZone = inject(NgZone);
  protected _cdRef = inject(ChangeDetectorRef);

  @ContentChildren(MatTabGroup, { descendants: true })
  private _tabGroups: QueryList<MatTabGroup> = new QueryList();

  private _buttons = new QueryList<FsButtonDirective>();
  private _activeSubmitButton: FsButtonDirective;
  private _currentTabIndex: number;
  private _tabConfirming: boolean;
  private _destroy$ = new Subject<void>();
  private _formService = inject(FsForm);
  
  public abstract submitting: boolean;
  public abstract confirm: ConfirmConfig | boolean;  

  public ngAfterContentInit(): void {
    this._registerConfirmTabs();
  }

  public get destroy$(): Observable<void> {
    return this._destroy$.asObservable();
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }
  
  public get buttons(): QueryList<FsButtonDirective> {
    return this._buttons;
  }

  public get activeSubmitButton(): FsButtonDirective {
    return this._activeSubmitButton;
  }

  public set activeSubmitButton(button: FsButtonDirective) {
    this._activeSubmitButton = button;
  }

  public addButton(button: FsButtonDirective): void {
    this._buttons
      .reset(
        [
          ...this._buttons.toArray(),
          button,
        ]);
  }

  public removeButton(button: FsButtonDirective): void {
    if(this._activeSubmitButton === button) {
      this._activeSubmitButton = null;
    }

    this._buttons.reset(
      [
        ...this._buttons.toArray()
          .filter((item) => (button !== item)),
      ]);
  }
  

  private _registerConfirmTabs(): void {
    this._registerConfirmTabGroups(this._tabGroups.toArray());
    this._tabGroups.changes
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._registerConfirmTabGroups(this._tabGroups.toArray());
      });
  }

  private _registerConfirmTabGroups(tabGroups: MatTabGroup[]): void {
    tabGroups.forEach((tabGroup: MatTabGroup) => {
      this._registerConfirmTabGroup(tabGroup);
    });
  }

  private _registerConfirmTabGroup(tabGroup: MatTabGroup): void {
    this._currentTabIndex = tabGroup.selectedIndex;

    tabGroup
      .selectedIndexChange
      .pipe(
        filter(() => !this._tabConfirming),
        switchMap((selectedIndex) => {
          if(
            this.confirm && 
            this.confirmTabs && 
            this instanceof FsFormDirective && this._formService.hasChanges(this)
          ) {
            this._tabConfirming = true;
            setTimeout(() => {  
              tabGroup.selectedIndex = this._currentTabIndex; 
              this._cdRef.markForCheck();
            });

            return this.triggerConfirm()
              .pipe(
                map((result) => {
                  if(confirmResultContinue(result)) {
                    tabGroup.selectedIndex = selectedIndex;

                    return selectedIndex;
                  }

                  return this._currentTabIndex;
                }),
                delay(50),
                tap(() => {
                  this._tabConfirming = false;
                }),
              );
          } 

          return of(selectedIndex);
        }),
        tap((selectedIndex) => {
          this._currentTabIndex = selectedIndex;
        }),
        takeUntil(this._destroy$),
      )
      .subscribe();
  }
  
  public abstract triggerSubmit(): void;
  public abstract triggerConfirm(): Observable<ConfirmResult>;
}
