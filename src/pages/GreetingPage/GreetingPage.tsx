import { Button } from '../../components/Button/Button';

export const GreetingPage = () => {
  return (
    <>
      <div>ПРИВЕТ !</div>
      <div>здесь расположился</div>
      <div>магазин4ик - smartshop</div>
      <div>
        <p>мы продаём полезные легальные растительныепродукты</p>
        <p>ввидешоколадок,джоинтов,чаяи пр.</p>
      </div>
      <p>это не бады, не лекарственные препараты,не наркотики,перед употреблениемпроконсультируйтесь со специалистом</p>
      <p>здесь то, что полюбилосьнам за годы экспериментов,то, что имеет заметныйполезный эффект</p>
      <p>мы всем советуем заменить вредные вещества на полезные. 🙃кому всем?🙃</p>
      <Button onClick={()=>{}} linkTo='/catalog'>в каталог</Button>
    </>
  );
};
