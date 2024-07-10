import { Button } from '../../components/Button/Button';
import style from './GreetingPage.module.scss';

export const GreetingPage = () => {
  return (
    <div className="main">
      <div className={style.wrapper}>
        <h4>ПРИВЕТ !</h4>
        <div className={style.lightning}>⚡ ⚡ ⚡ ⚡</div>
        <div>здесь расположился</div>
        <h3 className={style.regular}>магазин4ик - smartshop</h3>
        <div className={style.sides}>
          <p>мы продаём{<br/>}
            полезные{<br/>}
            легальные{<br/>}
            растительные{<br/>}
            продукты</p>
          <p>в виде{<br/>}
            шоколадок,{<br/>}
            джоинтов,{<br/>}
            чая {<br/>}и пр.
          </p>
        </div>
        <p>это не бады, не лекарственные препараты,не наркотики,перед употреблением проконсультируйтесь со специалистом</p>
        <p className={style.regular}>здесь то, что полюбилосьнам за годы экспериментов,то, что имеет заметныйполезный эффект</p>
        <p>мы всем советуем заменить вредные вещества на полезные. кому всем? 🙃{<strong>вам всем!</strong>}🙃 доброго дня приятного вечера.</p>
        <div className={style.wrapper}>
          <Button onClick={()=>{}} linkTo='/catalog'>в каталог</Button>
        </div>
      </div>
    </div>
  );
};
