import { createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) =>
    createStyles({
        header: {
            backgroundColor: "cadetblue",
            padding: "4px",
            maxWidth: "100%",
            overflowX: "auto"
        },
        toolbar: {
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            "& > *": {
                color: "white",
                flexDirection: "column",
                display: "flex",
                margin: "5px 10px 5px 10px"
            }
        }
    })
);
