import { createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) =>
    createStyles({
        header: {
            padding: "10px",
            maxWidth: "100%",
            overflowX: "auto"
        },
        toolbar: {
            "& > *": {
                color: "white",
                flexDirection: "column",
                display: "flex",
                marginRight: "40px"
            }
        }
    })
);
