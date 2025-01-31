import { format } from "date-fns";
import { IApiResponse } from "../../common/interfaces";
import { Build } from "../../common/models";

const STATUS_OPTIONS: any = {
  COMPLETED: "Available",
  QUEUED: "Building",
  FAILED: "Failed",
  BUILDING: "Building"
};

export const buildMapper = (
  { data }: IApiResponse<Build[]>,
  currentBuildId: number
) => {
  return data.map(({ id, status, ended_on }: Build) => {
    const date = format(new Date(ended_on), "MMMM do, yyyy - h:mm");
    if (id === currentBuildId) {
      return {
        id,
        name: `${date} - Active`
      };
    }
    return {
      id,
      name: `${date} - ${STATUS_OPTIONS[status]}`
    };
  });
};
