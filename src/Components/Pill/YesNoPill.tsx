import { Pill } from "./Pill";
import { Icon } from "@justfixnyc/component-library";
import { showYesNo } from "../../util/helpers";

type YesNoPillProps = {
  value: boolean;
};

export const YesNoPill: React.FC<YesNoPillProps> = ({ value }) => {
  if (value) {
    return (
      <Pill color="grey">
        <Icon icon="check" className="pill__icon_check" />
        {showYesNo(value)}
      </Pill>
    );
  } else {
    return (
      <Pill color="grey">
        <Icon icon="ban" className="pill__icon_ban" />
        {showYesNo(value)}
      </Pill>
    );
  }
};
