import {Table,TableHead,TableRow,TableCell,TableBody,TextField} from "@mui/material";
import { Link } from "react-router-dom";
import supabase from "../../../services/supabase-cliente";
import { useState, useEffect } from "react";

export default function Space() {
  const [spaces, setSpaces] = useState([]);

  const loadSpacesFromDatabase = async () => {
    const { data, error } = await supabase
      .from("spaces")
      .select("*");

    if (error) {
      console.error(error);
      return;
    }

    setSpaces(data);
  };

  useEffect(() => {
    loadSpacesFromDatabase();
  }, []);

  const updateSpaceInState = (spaceId, fieldName, newValue) => {
    setSpaces((previousSpaces) =>
      previousSpaces.map((space) =>
        space.id === spaceId
          ? { ...space, [fieldName]: newValue }
          : space
      )
    );
  };

  const saveSpaceFieldToDatabase = async (
    spaceId,
    fieldName,
    newValue
  ) => {
    const { error } = await supabase
      .from("spaces")
      .update({ [fieldName]: newValue })
      .eq("id", spaceId);

    if (error) {
      console.error(error);
    }
  };

  return (
    <div> 
    <Table size="small"
    > 
      <TableHead>
        <TableRow>
          <TableCell>Id</TableCell>
          <TableCell>Nome</TableCell>
          <TableCell>Capacidade</TableCell>
          <TableCell>Descrição</TableCell>

        </TableRow>
      </TableHead>

      <TableBody>
        {spaces.map((space) => (
          <TableRow key={space.id}>
            <TableCell>{space.id}</TableCell>

            <TableCell>
              <TextField
                value={space.appellation}
                onChange={(e) =>
                  updateSpaceInState(
                    space.id,"appellation",e.target.value
                  )
                }
                onBlur={(e) =>
                  saveSpaceFieldToDatabase(
                    space.id,"appellation",e.target.value
                  )
                }
                variant="standard"
              />
            </TableCell>

            <TableCell>
              <TextField
                type="number"
                value={space.capacity}
                onChange={(e) =>
                  updateSpaceInState(
                    space.id,"capacity",e.target.value
                  )
                }
                onBlur={(e) =>
                  saveSpaceFieldToDatabase(
                    space.id,"capacity",e.target.value
                  )
                }
                variant="standard"
              />
            </TableCell>

            <TableCell>
              <TextField
                type="text"
                value={space.descrição}
                onChange={(e) =>
                  updateSpaceInState(
                    space.id,"descrição",e.target.value
                  )
                }
                onBlur={(e) =>
                  saveSpaceFieldToDatabase(
                    space.id,"descrição",e.target.value
                  )
                }
                variant="standard"
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

<Link to="/"> ir </Link>

 </div> 
 );
}
