import style from "./PdfDocument.module.scss";
import {
  Document,
  Page,
  Image,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
// import Image from 'next/image';

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    padding: "50px",
  },
  section: {
    flexGrow: 1,
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
});

const PdfDocument = ({ studentDetail, exam_date }) => {
  console.log(studentDetail, exam_date);

  const table_heading = ["Serial No", "Subject", "Year"];
  return (
    <Document>
      <Page size={"A4"} style={styles.page}>
        <View style={styles.section}>
          <Text>Name: {studentDetail.student_name}</Text>

          <Text>Father: {studentDetail.father_name}</Text>
          <Text>Mohter: {studentDetail.mother_name}</Text>
          <Text>Roll: {studentDetail.roll}</Text>
          <Text>Center: {studentDetail.school}</Text>
          <Text>Exam Date: {exam_date.exam_date}</Text>

          <Text>Subject and Year</Text>
          <View>
            <Text>Serial No   Subject   year</Text>
            {/* <Text width={"100px"}>Subject</Text>
            <Text width={"100px"}>Year</Text> */}
          </View>
          {/* <Text>Subject and Year</Text> */}
          {/* {table_heading.map((each, index) => {
            return <Text key={index}>{each}</Text>;
          })} */}

          {studentDetail.subjectYear.map((each, index) => {
            return (
              <View key={index}>
                <View>
                  <Text>
                    {index + 1} {" "} {each.subject} {" "} {each.year}
                  </Text>
                  {/* <Text width={"100px"}>{each.subject}</Text>
                  <Text width={"100px"}>{each.year}</Text> */}
                </View>
              </View>
            );
          })}
        </View>
        {/* <View style={styles.section}>
          <Image src={studentDetail?.imageShow} alt=""></Image>
        </View> */}
        {/* <View style={styles.section}>
          <Text>Subject and Year</Text>
          <div className={style.heading_design}>
            {table_heading.map((each, index) => (
              <div key={index} width="100px">
                <Text>{each}</Text>
              </div>
            ))}
          </div>

          {studentDetail.subjectYear.map((each, index) => (
            <div key={index} className={style.table_cell_design}>
              <div width="100px">
                <Text>{index + 1}</Text>
              </div>
              <div width="100px">
                <Text>{each?.subject}</Text>
              </div>
              <div width="100px">
                <Text>{each?.year}</Text>
              </div>
            </div>
          ))}
        </View> */}
      </Page>
      {/* <button onClick={()=>generatePdf(studentDetail,exam_date)}>Download Admit Card</button> */}
    </Document>
  );
};

export default PdfDocument;
