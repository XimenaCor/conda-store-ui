import React, { memo, useEffect, useReducer } from "react";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import { EnvironmentsList } from "./EnvironmentsList";
import { debounce } from "lodash";
import { EnvironmentsSearch } from "./EnvironmentsSearch";
import { useLazyFetchEnvironmentsQuery } from "../environmentsApiSlice";
import { ActionTypes, initialState, environmentsReducer } from "../reducer";

const BaseEnvironments = ({
  refreshEnvironments,
  onUpdateRefreshEnvironments
}: any) => {
  const size = 100;
  const [state, dispatch] = useReducer(environmentsReducer, initialState);

  const {
    palette: { primary }
  } = useTheme();

  const [triggerQuery] = useLazyFetchEnvironmentsQuery();

  const handleChange = debounce(async (value: string) => {
    const { data } = await triggerQuery({ page: 1, size, search: value });

    if (data) {
      dispatch({
        type: ActionTypes.SEARCHED,
        payload: { data: data.data, count: data.count, search: value }
      });
    }
  }, 500);

  const next = async () => {
    const { data } = await triggerQuery({
      page: state.page + 1,
      size,
      search: state.search
    });

    if (data) {
      dispatch({
        type: ActionTypes.NEXT_FETCHED,
        payload: { data: data.data, count: data.count }
      });
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await triggerQuery({
        page: state.page,
        size,
        search: state.search
      });

      if (data) {
        dispatch({
          type: ActionTypes.DATA_FETCHED,
          payload: { data: data.data, count: data.count }
        });
      }

      onUpdateRefreshEnvironments(false);
    })();
  }, [refreshEnvironments]);

  return (
    <Box sx={{ width: "313px", border: `1px solid ${primary.main}` }}>
      <Box sx={{ borderBottom: `1px solid ${primary.main}` }}>
        <EnvironmentsSearch onChange={e => handleChange(e.target.value)} />
      </Box>
      <Box sx={{ height: "calc(100vh - 103px)" }}>
        {state.data && (
          <EnvironmentsList
            next={next}
            hasMore={size * state.page < state.count}
            environmentsList={state.data}
            search={state.search}
          />
        )}
      </Box>
    </Box>
  );
};

export const Environments = memo(BaseEnvironments);
