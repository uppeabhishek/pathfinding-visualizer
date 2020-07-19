import { createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flex: 1
        },
        table: {
            borderSpacing: 0,
            "& td": {
                border: "0.5px solid black"
            },
            "& td.selected": {
                backgroundColor: "#72d5ad"
            }
        }
    })
);
