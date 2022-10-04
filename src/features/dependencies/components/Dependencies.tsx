import React, { useEffect, useRef } from "react";
import Accordion from "@mui/material/Accordion";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  StyledAccordionExpandIcon,
  StyledAccordionDetails,
  StyledAccordionSummary,
  StyledAccordionTitle
} from "../../../styles";
import { Dependency } from "../../../common/models";
import { DependenciesItem } from "./DependenciesItem";
import { useAppSelector } from "../../../hooks";

export interface IDependenciesProps {
  /**
   * @param dependencies list of dependencies
   * @param mode change whether the component only displays the list or we are able to edit it
   * @param hasMore needed for infinite scroll, if this is true next function will be called
   * @param next handler which will be called when we scoll at the current bottom of the infinite scroll lists
   */
  dependencies: Dependency[];
  mode: "read-only" | "edit";
  hasMore: boolean;
  next?: () => void;
}

export const Dependencies = ({
  mode,
  dependencies,
  hasMore,
  next = () => null
}: IDependenciesProps) => {
  const { selectedEnvironment } = useAppSelector(state => state.tabs);
  const listLength = dependencies.length;
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [selectedEnvironment?.id]);

  return (
    <Accordion
      sx={{
        maxWidth: mode === "read-only" ? "490px" : "576px",
        boxShadow: "none"
      }}
      disableGutters
    >
      <StyledAccordionSummary expandIcon={<StyledAccordionExpandIcon />}>
        <StyledAccordionTitle>
          Packages Installed as Dependencies
        </StyledAccordionTitle>
      </StyledAccordionSummary>
      <StyledAccordionDetails
        id="infScroll"
        sx={{ padding: "15px 40px", maxHeight: "100px" }}
        ref={scrollRef}
      >
        <InfiniteScroll
          hasMore={hasMore}
          loader={
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px"
              }}
            >
              <CircularProgress />
            </Box>
          }
          dataLength={listLength}
          next={next}
          scrollableTarget="infScroll"
          style={{ overflow: "hidden" }}
        >
          {dependencies.map((dependency, index) => (
            <Box
              key={dependency.id}
              sx={{ marginBottom: index === listLength - 1 ? "0px" : "20px" }}
            >
              <DependenciesItem
                mode={mode}
                dependency={dependency}
                onClick={() => null}
              />
            </Box>
          ))}
        </InfiniteScroll>
      </StyledAccordionDetails>
    </Accordion>
  );
};
