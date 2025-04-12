import {Button, IconButton, Menu, Stack} from "@mui/material"
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import {useState} from "react";


export default function ProfileQuickMenu() {
  const [anchor, setAnchor] = useState<Element | null>(null);
  return <>
    <IconButton onClick={(e) => {
      setAnchor(e.currentTarget)
    }}>
      <AccountBoxIcon/>
    </IconButton>
    <Menu open={Boolean(anchor)} anchorEl={anchor} onClose={() => setAnchor(null)} slotProps={{}}>
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