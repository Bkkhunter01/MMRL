import { DAPITestActivity } from "@Activitys/DAPITestActivity";
import DescriptonActivity from "@Activitys/DescriptonActivity";
import RepoActivity from "@Activitys/RepoActivity";
import SettingsActivity from "@Activitys/SettingsActivity";
import NoAccountActivty from "@Activitys/account/NoAccountActivity";
import { StyledListItemText } from "@Components/StyledListItemText";
import { useStrings } from "@Hooks/useStrings";
import { Divider, List, ListItemButton, ListSubheader } from "@mui/material";
import { Page } from "react-onsenui";
import AccountActivty from "@Activitys/account/AccountActivity";
import { useFirebase } from "@Hooks/useFirebase";
import { IntentPusher } from "@Hooks/useActivity";

type Props = {
  renderToolbar: () => JSX.Element;
  hideSplitter: () => void;
  pushPage: (props: IntentPusher) => void;
};

export const DrawerFragment = (props: Props) => {
  const hide = props.hideSplitter;
  const pushPage = props.pushPage;
  const { auth } = useFirebase();

  const { strings } = useStrings();

  return (
    <Page renderToolbar={props.renderToolbar}>
      <List subheader={<ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>App</ListSubheader>}>
        <ListItemButton
          onClick={() => {
            if (auth?.currentUser) {
              pushPage({
                component: AccountActivty,
                key: "acc",
                props: {},
                extra: {},
              });
            } else {
              pushPage({
                component: NoAccountActivty,
                key: "no_acc",
              });
            }
            hide();
          }}
        >
          <StyledListItemText primary={"Account"} />
        </ListItemButton>

        <ListItemButton
          onClick={() => {
            pushPage({
              component: SettingsActivity,
              key: "settings",
            });
            hide();
          }}
        >
          <StyledListItemText primary={strings.settings} />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            pushPage({
              component: RepoActivity,
              key: "repos",
            });
            hide();
          }}
        >
          <StyledListItemText primary={strings.repositories} />
        </ListItemButton>
      </List>

      <Divider />

      <List subheader={<ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>Components</ListSubheader>}>
        <ListItemButton
          onClick={() => {
            pushPage({
              component: DAPITestActivity,
              key: "dapitestActivity",
            });
            hide();
          }}
        >
          <StyledListItemText primary={"DAPI Tester"} />
        </ListItemButton>
      </List>

      <Divider />

      <List subheader={<ListSubheader sx={(theme) => ({ bgcolor: theme.palette.background.default })}>Other</ListSubheader>}>
        <ListItemButton
          onClick={() => {
            pushPage({
              component: DescriptonActivity,
              key: "license",
              extra: {
                request: {
                  use: true,
                  url: "https://raw.githubusercontent.com/wiki/DerGoogler/MMRL/License.md",
                },
                title: "License",
              },
            });
            hide();
          }}
        >
          <StyledListItemText primary={"License"} />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            pushPage({
              component: DescriptonActivity,
              key: "changelog",
              extra: {
                request: {
                  url: "https://raw.githubusercontent.com/wiki/DerGoogler/MMRL/Changelog.md",
                },
                title: "Changelog",
              },
            });
            hide();
          }}
        >
          <StyledListItemText primary={"Changelog"} />
        </ListItemButton>
      </List>

      {/* <Divider /> */}
    </Page>
  );
};
