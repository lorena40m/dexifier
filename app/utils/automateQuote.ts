// import { useAppDispatch, useAppSelector } from "@/redux_slice/provider";
// import { RouteData } from "../types/interface";
// import { getBestRoutes } from "../api/rango-api";
// import {
//   getRoutes,
//   setRouteProcess,
//   setSelectedRoute,
//   updateRouteFetched,
// } from "@/redux_slice/slice/routeSlice";
// import { toastError } from "@/lib/utils";

// export const refetchRoutes = (isFromToken: boolean) => {
//   const dispatch = useAppDispatch();

//   const { isInProcess, isSwapMade } = useAppSelector((state) => state.swap);
//   const selectedToken = useAppSelector((state) =>
//     isFromToken ? state?.tokens?.fromToken : state?.tokens?.toToken
//   );
//   const selectedRoute = useAppSelector((state) => state.routes.selectedRoute);
//   const savedRouteData = useAppSelector((state) => state.quoteData);
//   const { isRouteProcess, isRoutesFetched } = useAppSelector(
//     (state) => state.routes
//   );
//   const routeData: RouteData = {
//     ...savedRouteData,
//     amount: selectedToken.value,
//   };
//   console.log("newRouteFromInput:", routeData);
//   if (
//     routeData.from.blockchain == "" ||
//     routeData.to.blockchain == "" ||
//     routeData.amount == "" ||
//     routeData.amount == 0 ||
//     routeData.amount == undefined
//   ) {
//     return;
//   }
//   dispatch(setRouteProcess({ isRouteProcess: true }));
//   getBestRoutes(routeData)
//     .then((data) => {
//       dispatch(setSelectedRoute({ route: data.results[0] }));
//       dispatch(getRoutes({ routes: data.results }));
//       dispatch(updateRouteFetched({ isRouteFetched: true }));
//     })
//     .catch((error) => {
//       toastError("No routes found!");
//     })
//     .finally(() => {
//       dispatch(setRouteProcess({ isRouteProcess: false }));
//     });
// };
