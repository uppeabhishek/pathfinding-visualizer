import { createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column"
        }
    })
);
