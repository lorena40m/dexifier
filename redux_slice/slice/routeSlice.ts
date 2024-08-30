import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Result } from "@/app/types/interface";

const initialRouteState: {
  isExchangeButtonClicked: boolean;
  isError: boolean;
  isRoutesFetched: boolean;
  isRouteProcess: boolean;
  selectedRoute: Result | undefined;
  routes: Result[];
} = {
  isExchangeButtonClicked: false,
  isError: false,
  isRoutesFetched: false,
  isRouteProcess: false,
  selectedRoute: undefined,
  routes: [],
};

export const routeSlice = createSlice({
  name: "routes",
  initialState: initialRouteState,
  reducers: {
    getRoutes(state, action: PayloadAction<{ routes: Result[] }>) {
      return { ...state, routes: action.payload.routes };
    },
    setSelectedRoute(state, action: PayloadAction<{ route: Result }>) {
      return { ...state, selectedRoute: action.payload.route };
    },
    setRouteProcess(state, action: PayloadAction<{ isRouteProcess: boolean }>) {
      return { ...state, isRouteProcess: action.payload.isRouteProcess };
    },
    updateRouteFetched(
      state,
      action: PayloadAction<{ isRouteFetched: boolean }>
    ) {
      return { ...state, isRoutesFetched: action.payload.isRouteFetched };
    },
    setError(state, action: PayloadAction<{ isError: boolean }>) {
      return { ...state, isError: action.payload.isError };
    },
    setExchangeMode(state, action: PayloadAction<{ isExchangeButtonClicked: boolean }>) {
      return { ...state, isExchangeButtonClicked: action.payload.isExchangeButtonClicked };
    },
    resetRoute(_) {
      return initialRouteState;
    },
  },
});

export const { resetRoute, getRoutes, updateRouteFetched, setSelectedRoute, setExchangeMode, setRouteProcess, setError } =
  routeSlice.actions;
