import {AppBar, Stack, Toolbar} from "@mui/material";
import ProfileQuickMenu from "./ProfileQuickMenu.tsx";
import {useSso} from "../store/SsoStore.tsx";

export default function TopBar() {
  const authed = useSso(state => state.authenticated);
  return <AppBar position="fixed" >
    <Toolbar>
      <Stack direction={"row"} width={'100%'} justifyContent={"flex-end"}>
        {authed && <ProfileQuickMenu/>}
      </Stack>
    </Toolbar>
  </AppBar>
}