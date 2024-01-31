import styles from './AccessForm.module.scss';

const AccessForm = ({fields}) => {
    return (
        <div className={styles.access_form_design}>

            {/* Section: form design */}
            <form>

                {/* Section: input field design */}
                {
                    fields.map((field,index)=> <div key={index} className={styles.field_design}>
                        <label htmlFor={field[0]}>{field[1]}</label>
                        <input name={field[0]} type="text"/>
                    </div>)
                }
                
            </form>
        </div>
    );
};

export default AccessForm;