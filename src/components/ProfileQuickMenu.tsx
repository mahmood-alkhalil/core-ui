import {Button, IconButton, Menu, Stack} from "@mui/material"
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import {useState} from "react";


export default function ProfileQuickMenu() {
    const [anchor, setAnchor] = useState<EventTarget | null>(null);
    return <>
        <IconButton onClick={(e) => {
            setAnchor(e.currentTarget)
        }}>
            <AccountBoxIcon/>
        </IconButton>
        <Menu open={Boolean(anchor)} anchorEl={anchor} onClose={() => setAnchor(null)} slotProps={{paper:{
            sx:{
                padding:0
            }
                }}>
            <Stack direction="column" alignItems="center" minWidth={"200px"}>
                <Stack direction={"column"} width={"100%"}>
                    <Button>
                        Available
                    </Button>
                </Stack>
            </Stack>
        </Menu>
    </>
}