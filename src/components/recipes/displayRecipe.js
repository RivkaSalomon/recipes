import * as React from 'react';
import { useSelector } from "react-redux";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { deleteRecipe } from "../service/recipe";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
const DisplayRecipe = ({ recipe }) => {
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isDeleted, setIsDeleted] = React.useState(false);

  const deleteR = (id) => {
    console.log("1")
    dispatch(deleteRecipe(id));
    console.log("2")
    setIsDeleted(true);
  }

  const add = (i) => {
    const item = { Name: i.Name, UserId: user.Id, Count: 1 }
    axios.post(`http://localhost:8080/api/bay`, item)
      .then(alert('המוצר הוסף בהצלחה'))
  }
  const EditRecipe = (recipe) => {
    dispatch({ type: 'SET_SELECTED_RECIPE', data: recipe });
    navigate('../addRecipe')
  }
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (<>
    {isDeleted && null}
    {!isDeleted &&
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={recipe.Name}
        />
        <CardMedia
          component="img"
          height="194"
          image={recipe.Img}
        // alt={recipe.Img}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <div>  {recipe.Description}</div>

          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          {user.Id === recipe.UserId && <button
            onClick={() => deleteR(recipe.Id)} >
            מחק
          </button>}
          {user.Id === recipe.UserId && <button
            onClick={() => EditRecipe(recipe)}
          >
            ערוך
          </button>}
          { }
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography class="t" paragraph>הוראות הכנה</Typography>
            <Typography paragraph>
              {
                recipe.Instructions.map(i => <p>{i}</p>)//להוסיף כאן עיצוב של הצגת הוראות מתכון
              }

            </Typography>
            <Typography class="t" paragraph>המוצרים הנדרשים </Typography>

            <Typography paragraph>
              {recipe.Ingrident.map((i, index) => <div><button class="index" onClick={() => add(i)} /><p>  {i.Count} {i.Type} {i.Name}</p></div>)}

            </Typography>
            <Typography paragraph>

            </Typography>
            <Typography class="t">
              רמת קושי: {recipe.Difficulty}
            </Typography>
            <Typography class="t">
              זמן הכנה: {recipe.Duration}
              דקות
            </Typography>

          </CardContent>
        </Collapse>
      </Card>}</>
  );
}
export default DisplayRecipe;
