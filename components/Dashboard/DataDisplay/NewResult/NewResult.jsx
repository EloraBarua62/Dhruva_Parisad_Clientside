import styles from './NewResult.module.scss';

const NewResult = () => {
    const table_heading = ['Roll','Name','School ID','Subject','Year', 'Writter', 'Practical', 'Total Score', 'Total Grade','Details'];
    // const roll1 = {
    //   roll: 1,
    //   name: 'elora barua',
    //   school_id: '23456543',
    //   subject: ['Poem','Shak','Rock','Nock','Chaka'],
    //   year: ['primary','1st','2nd','2nd','3rd'],
    //   written: 0,
    //   practical: 80,
    //   total_score: this.written+ this.practical,
    //   grade: 'A+'
    // }
    
    return (
      <div className={styles.newresult_design}>
        {/* Table heading */}
        <div className={styles.heading_field_design}>
          {table_heading.map((head, index) => (
            <div key={index} className={styles.single_heading}>
              {head}
            </div>
          ))}
        </div>
      </div>
    );
};

export default NewResult;