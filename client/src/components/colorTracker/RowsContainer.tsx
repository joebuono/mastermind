import styles from '../styles/rowsContainer.module.css';
import Row from './Row';

type Props = {
  colorTrackerData: any,
  codeSize: number,
  certainties: any
}

export default function RowsContainer ({colorTrackerData, codeSize, certainties}: Props) {
  let colorData = [];
  for (let color in colorTrackerData) {
    colorData.push({
      color,
      number: colorTrackerData[color].number,
      position: colorTrackerData[color].position
    });
  }

  return (
    <div className={styles.rows}>
      {colorData.map((color, index) => <Row key={index} colorInfo={color} codeSize={codeSize} certainties={certainties}/>)}
    </div>
  );
};