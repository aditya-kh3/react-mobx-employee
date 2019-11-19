import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: ["Nunito Sans", "sans-serif"].join(",")
  },

  palette: {
    primary: {
      main: "#4286e3"
    }
  }
});

export default theme;
