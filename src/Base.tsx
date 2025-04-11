import {createTheme} from '@mui/material/styles';
import {Container, CssBaseline, Stack, ThemeProvider} from "@mui/material";
import TopBar from "./components/TopBar.tsx";

const theme = createTheme({
    palette: {
        mode: 'dark',
    }
})

export default function Base() {
    return <ThemeProvider theme={theme}>
        <CssBaseline/>
        <TopBar/>
        <Container maxWidth={false} disableGutters={true} sx={{height: '100vh'}}>
            <Stack height={"100%"} width={"100%"}>

            </Stack>
        </Container>
    </ThemeProvider>

}