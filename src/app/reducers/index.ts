import { routerReducer } from "@ngrx/router-store";
import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { environment } from "../../environments/environment";
import { AuthState } from "../auth/reducers";

export const authFeatureKey = "auth";

export interface AppState {
  
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
}

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action ) => {
    console.log('state before configured reducers', state);
    console.log('action', action);
    return reducer(state, action);
  }
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [logger] : []
