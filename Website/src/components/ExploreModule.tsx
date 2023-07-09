import { Box, Chip, Divider, Stack, Typography, IconButton, IconButtonProps } from "@mui/material";
import { useActivity } from "@Hooks/useActivity";
import { useStrings } from "@Hooks/useStrings";
import DescriptionIcon from "@mui/icons-material/Description";
import { Paper, PaperProps, styled } from "@mui/material";
import { useSettings, useTheme } from "@Hooks/useSettings";
import useShadeColor from "@Hooks/useShadeColor";
import DescriptonActivity from "@Activitys/DescriptonActivity";
import { VerifiedRounded } from "@mui/icons-material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { os } from "@Native/Os";
import { StyledCard } from "./StyledCard";
import { StyledIconButton } from "./StyledIconButton";

interface Props {
  index: number;
  moduleProps: Module;
  moduleOptions: any;
}
export const ExploreModule = (props: Props) => {
  const { context } = useActivity();
  const { strings } = useStrings();

  const { moduleOptions, index } = props;
  const { id, notes_url, zip_url, last_update, prop_url } = props.moduleProps;

  // Create better handler
  const isVerified = moduleOptions[id]?.verified;
  const _display = moduleOptions[id]?.display;

  const formatDate = (date: Date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    // @ts-ignore
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
  };

  const handleOpen = () => {
    context.pushPage<any>({
      component: DescriptonActivity,
      props: {
        key: `view_${prop_url.id}`,
        extra: {
          title: prop_url.name,
          prop_url: prop_url,
          module_options: props.moduleOptions,
          request: {
            tpe: "text",
            url: notes_url,
          },
        },
      },
    });
  };

  const handleDownload = () => {
    os.open(zip_url);
  };

  return (
    <StyledCard elevation={0}>
      <Box sx={{ p: 2, display: "flex" }}>
        <Stack spacing={0.5} style={{ flexGrow: 1 }} onClick={handleOpen}>
          <Typography fontWeight={700} color="text.primary">
            {prop_url.name}
          </Typography>{" "}
          <Typography variant="caption" sx={{ fontSize: ".70rem" }} color="text.secondary">
            {prop_url.version} ({prop_url.versionCode}) / {prop_url.author}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {prop_url.description}
          </Typography>
        </Stack>
      </Box>
      <Divider />
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 1 }}>
        <Chip
          size="small"
          sx={(theme) => ({
            bgcolor: theme.palette.secondary.light,
          })}
          label={formatDate(new Date(last_update))}
        />
        <Stack spacing={0.8} direction="row">
          {isVerified && (
            <StyledIconButton
              style={{ width: 30, height: 30 }}
              onClick={() => {
                os.toast(strings.module_verified, Toast.LENGTH_SHORT);
              }}
            >
              <VerifiedRounded sx={{ fontSize: 14 }} />
            </StyledIconButton>
          )}

          <StyledIconButton style={{ width: 30, height: 30 }} onClick={handleDownload}>
            <FileDownloadIcon sx={{ fontSize: 14 }} />
          </StyledIconButton>
        </Stack>
      </Stack>
    </StyledCard>
  );
};
