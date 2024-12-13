import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MultiRouteSimulationResult } from "rango-types/mainApi";

const initialRouteState: {
  isExchangeButtonClicked: boolean;
  isError: boolean;
  isRoutesFetched: boolean;
  isRouteProcess: boolean;
  selectedRoute: MultiRouteSimulationResult | undefined;
  routes: MultiRouteSimulationResult[];
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
    getRoutes(state, action: PayloadAction<{ routes: MultiRouteSimulationResult[] }>) {
      return { ...state, routes: action.payload.routes };
    },
    setSelectedRoute(state, action: PayloadAction<{ route: MultiRouteSimulationResult }>) {
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
