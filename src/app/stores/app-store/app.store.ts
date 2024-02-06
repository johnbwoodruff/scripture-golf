import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

import { ScriptureGolfState, AppTheme } from './app.store.types';

const initialState: ScriptureGolfState = {
  theme: 'dark'
};

export const ScriptureGolfStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    updateTheme(theme: AppTheme): void {
      patchState(store, { theme });
    }
  }))
);
