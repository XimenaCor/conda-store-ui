import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import React from "react";

import { EnvBuilds, Description } from "../../../features/metadata/components";
import { StyledBox } from "../../../styles";

export enum EnvironmentDetailsModes {
  "CREATE" = "create",
  "READ" = "read-only",
  "EDIT" = "edit"
}

interface IEnvMetadataProps {
  /**
   * @param selectedEnv Selected environment's information
   * @param mode change whether the component only displays the list of builds, edit the environment description or create a new description
   * @param onUpdateDescription change environment description
   */
  selectedEnv: any;
  description: any;
  mode: "create" | "read-only" | "edit";
  onUpdateDescription: (description: string) => void;
  current_build_id: number;
}

export const EnvMetadata = ({
  selectedEnv,
  description,
  mode,
  onUpdateDescription,
  current_build_id
}: IEnvMetadataProps) => {
  const { palette } = useTheme();
  // const { current_build_id = undefined, description: envDescription } =
  //   selectedEnv;

  // let enviromentBuilds = undefined;
  // if (current_build_id) {
  //   // It is calling multiple times
  //   const { data } = useGetEnviromentBuildsQuery(selectedEnv);
  //   enviromentBuilds = data;
  // }
  // const [buildId, setBuildId] = useState(selectedEnv?.current_build_id || "");

  return (
    <StyledBox>
      <List>
        <ListItem>
          <ListItemText
            primary={
              <Typography sx={{ fontSize: "21px", fontWeight: 400 }}>
                Environment Metadata
              </Typography>
            }
          ></ListItemText>
        </ListItem>
        <Divider sx={{ bgcolor: palette.primary.main }} />
      </List>
      <Description
        mode={mode}
        description={description || undefined}
        onChangeDescription={onUpdateDescription}
      />
      {mode !== EnvironmentDetailsModes.CREATE && selectedEnv && (
        <EnvBuilds data={selectedEnv} currentBuildId={current_build_id} />
      )}
    </StyledBox>
  );
};
