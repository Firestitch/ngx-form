import {
  AfterContentInit,
  ContentChildren,
  Directive,
  Input,
  OnDestroy,
  QueryList,
} from '@angular/core';

import { MatTab, MatTabGroup, MatTabHeader } from '@angular/material/tabs';

import { filter, Observable, of, Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

import { ConfirmResult } from '../../enums';
import { confirmResultContinue } from '../../helpers';
import { ConfirmConfig, ConfirmTabGroup } from '../../interfaces';
import { FsButtonDirective } from '../button.directive';


@Directive()
export abstract class FsFormBaseDirective implements AfterContentInit, OnDestroy {

  @Input()
  public confirmTabs = true;
  
  @Input()
  public tabGroup: MatTabGroup;

  private _destroy$ = new Subject<void>();

  @ContentChildren(MatTabGroup, { descendants: true })
  private _tabGroups: QueryList<MatTabGroup> = new QueryList();

  private _buttons = new QueryList<FsButtonDirective>();
  private _activeSubmitButton: FsButtonDirective;
  
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
    const confirmTabGroup = tabGroup as ConfirmTabGroup;
    if (!confirmTabGroup._originalHandleClick) {
      confirmTabGroup._originalHandleClick = tabGroup._handleClick;
      confirmTabGroup._handlClick$ = new Subject<{
         tab: MatTab; 
         tabHeader: MatTabHeader; 
         idx: number 
        }>();

      confirmTabGroup._handleClick = (tab: MatTab, tabHeader: MatTabHeader, idx: number) => {
        if (confirmTabGroup._handlClick$.observers.length) {
          confirmTabGroup._handlClick$.next({ tab, tabHeader, idx });
        } else {
          confirmTabGroup._originalHandleClick(tab, tabHeader, idx);
        }
      };
    }

    confirmTabGroup._handlClick$
      .pipe(
        filter(() => !this.submitting),
        switchMap((event) => {
          if(this.confirm && this.confirmTabs) {
            return this.triggerConfirm()
              .pipe(
                tap((result) => {
                  if (confirmResultContinue(result)) {
                    confirmTabGroup.selectedIndex = event.idx;
                  }
                }),
              );
          }

          confirmTabGroup._originalHandleClick(event.tab, event.tabHeader, event.idx);

          return of(null);
        }),
        takeUntil(this._destroy$),
      )
      .subscribe();
  }
  
  public abstract triggerSubmit(): void;
  public abstract triggerConfirm(): Observable<ConfirmResult>;
}
