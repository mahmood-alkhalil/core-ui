import {createTheme} from '@mui/material/styles';
import {CircularProgress, Container, CssBaseline, Stack, ThemeProvider} from "@mui/material";
import TopBar from "./components/TopBar.tsx";
import {useSso} from "./store/SsoStore.tsx";
import Init from "./components/Init.tsx";

const theme = createTheme({
  palette: {
    mode: 'dark',
  }
})

export default function Base() {
  const ssoIniting = useSso(state => state.initializing);
  return <ThemeProvider theme={theme}>
    <Init/>
    <CssBaseline/>
    <TopBar/>
    <Container maxWidth={false} disableGutters={true} sx={{height: '100vh'}}>
      <Stack height={"100%"} width={"100%"}>
        {ssoIniting && <CircularProgress/>}
      </Stack>
    </Container>
  </ThemeProvider>

}