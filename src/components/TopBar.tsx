import {AppBar, Stack, Toolbar} from "@mui/material";
import ProfileQuickMenu from "./ProfileQuickMenu.tsx";

export default function TopBar() {
    return <AppBar position="fixed">
        <Toolbar>
            <Stack direction={"row"} width={'100%'} justifyContent={"flex-end"}>
                <ProfileQuickMenu/>
            </Stack>
        </Toolbar>
    </AppBar>
}