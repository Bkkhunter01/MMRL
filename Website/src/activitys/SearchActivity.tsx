import React from "react";
import FlatList, { SearchOptionsInterface, FlatListProps } from "flatlist-react";
import { useActivity } from "@Hooks/useActivity";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { Page } from "@Components/onsenui/Page";
import { useStrings } from "@Hooks/useStrings";
import InputBase from "@mui/material/InputBase";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, List } from "@mui/material";
import { renderFunc } from "flatlist-react/lib/___subComponents/uiFunctions";
import { useTheme } from "@Hooks/useTheme";
import { useSettings } from "@Hooks/useSettings";
import { os } from "@Native/Os";

const RenderWhenEmpty = React.memo(() => {
  const { theme } = useTheme();
  return (
    <Box
      component="h4"
      sx={{
        color: theme.palette.secondary.dark,
        position: "absolute",
        left: "50%",
        top: "50%",
        WebkitTransform: "translate(-50%, -50%)",
        transform: "translate(-50%, -50%)",
      }}
    >
      What you looking for?
    </Box>
  );
});

interface SearchActivityProps {
  list: any[];
  placeholder?: string;
  search?: SearchOptionsInterface<any>;
  group?: FlatListProps<any>["group"];
  renderList: renderFunc<any>;
}

function SearchActivity(props: SearchActivityProps) {
  const { strings } = useStrings();
  const { settings } = useSettings();
  const { context } = useActivity();
  const { theme } = useTheme();

  const { placeholder, list, renderList } = props;
  const __placeholder = placeholder ? placeholder : strings("search");

  const [search, setSearch] = React.useState<string>("");

  React.useEffect(() => {
    os.setStatusBarColor(theme.palette.background.default);

    return function () {
      os.setStatusBarColor(theme.palette.primary.main);
    };
  }, []);

  const renderToolbar = () => {
    return (
      <Toolbar
        sx={{ backgroundColor: theme.palette.background.default, borderBottom: `thin solid ${theme.palette.divider}` }}
        modifier="noshadow"
      >
        <Toolbar.Left>
          <Toolbar.BackButton
            iconProps={{
              sx: !settings.darkmode
                ? {
                    color: theme.palette.secondary.dark,
                  }
                : {},
            }}
            onClick={context.popPage}
          />
        </Toolbar.Left>
        <Toolbar.Center
          sx={{
            display: "flex",
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <InputBase
            autoFocus
            fullWidth
            value={search}
            inputProps={{
              "aria-label": __placeholder,
            }}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={__placeholder}
          />
        </Toolbar.Center>

        <Toolbar.Right>
          <Toolbar.Button
            icon={ClearIcon}
            iconProps={{
              sx: !settings.darkmode
                ? {
                    color: theme.palette.secondary.dark,
                  }
                : {},
            }}
            onClick={() => {
              setSearch("");
            }}
          />
        </Toolbar.Right>
      </Toolbar>
    );
  };

  const __list = React.useMemo(() => (search ? list : []), [search]);

  return (
    <Page modifier="noshadow" renderToolbar={renderToolbar}>
      <Page.RelativeContent>
        <List sx={{ position: "unset" }}>
          <FlatList
            list={__list}
            renderItem={renderList}
            renderWhenEmpty={() => <RenderWhenEmpty />}
            renderOnScroll
            search={{ term: search, ...props.search }}
            group={props.group}
          />
        </List>
      </Page.RelativeContent>
    </Page>
  );
}

export { SearchActivity, SearchActivityProps };
