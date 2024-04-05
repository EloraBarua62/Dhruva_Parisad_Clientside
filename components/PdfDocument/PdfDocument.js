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
    paddingTop: "50px",
    paddingBottom: "30px",
    paddingLeft: "40px",
    paddingRight: "40px",
  },
  section: {
    flexGrow: 1,
  },
  main_section: {
    flexDirection: "row",
    marginTop: "50px",
    marginBottom: "50px",
  },
  two_section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "start",
    gap: "50px",
    paddingLeft: "10px",
    paddingright: "10px",
    paddingTop: "10px",
    paddingBottom: "10px",
    marginBottom: "50px",
    border: "2px",
    borderColor: "green",
    borderRadius: "5px",
    width: "100%",
  },
  date_section: {
    fontSize: "16px",
    flexDirection: "row",
    justifyContent: "center",
    gap: "20px",
  },
  title: {
    color: "green",
    fontSize: "28px",
    fontWeight: "extrabold",
    marginTop: "20px",
    marginBottom: "20px",
    textAlign: "center",
  },
  reg: {
    fontSize: "16px",
    textAlign: "center",
  },
  sub_year: {
    color: "green",
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "20px",
    marginBottom: "20px",
    textDecoration: "underline",
  },
  sub_year_details: {
    border: "1px",
    borderColor: "green",
    borderRadius: "5px",
  },
  date: {
    color: "green",
    fontSize: "18px",
    marginTop: "10px",
    textAlign: "center"
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  signature: {
    fontSize: "16px",
    textAlign: "right",
    marginTop: "20px",
    marginBottom: "20px",
  },
  footer: {
    fontSize: "12px",
    textAlign: "center",
  },
  info_section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
  },
});

const PdfDocument = ({ studentDetail, exam_date }) => {
  console.log(studentDetail, exam_date);

  const table_heading = ["Serial No", "Subject", "Year"];
  const currentYear = new Date().getFullYear();
  const month = new Date().getMonth();
  const day = new Date().getDay();
  let currentBanglaYear = currentYear - 594;
  if (month >= 3 && day >= 15) ++currentBanglaYear;

  return (
    <Document>
      <Page size={"A4"} style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Dhruva Parisad</Text>
          <Text style={styles.reg}>Registration No: 0923</Text>
          <View style={styles.date_section}>
            <Text>{currentBanglaYear} BS</Text>
            <Text>{currentYear} AD</Text>
          </View>
          <Text style={styles.date}>Admit Card - {currentYear}</Text>
          <Text style={styles.sub_year}>Student Information</Text>
          <View style={styles.two_section}>
            <View>
              <Text>Name: {studentDetail.student_name}</Text>
              <Text>Father: {studentDetail.father_name}</Text>
              <Text>Mohter: {studentDetail.mother_name}</Text>
              <Text>Roll: {studentDetail.roll}</Text>
              <Text>Center: {studentDetail.school}</Text>
              <Text>Exam Date: {exam_date.exam_date}</Text>
            </View>
            <View style={styles.image}>
              <Image src={studentDetail.imageShow} alt=""></Image>
            </View>
          </View>

          <Text style={styles.sub_year}>Subject and Year</Text>
          <View>
            {studentDetail.subjectYear.map((each, index) => {
              return (
                <View key={index}>
                  <View>
                    <Text>
                      Subject {index + 1}: {each.subject}, Year: {each.year}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          <Text style={styles.signature}>
            Signature: _ _ _ _ _ _ _ _ _ _ _ _ _
          </Text>
          <Text style={styles.footer}>
            Please bring this admit card in exam hall.
          </Text>
          {/* <Text>Subject and Year</Text> */}
          {/* {table_heading.map((each, index) => {
            return <Text key={index}>{each}</Text>;
          })} */}
        </View>
      </Page>
      {/* <button onClick={()=>generatePdf(studentDetail,exam_date)}>Download Admit Card</button> */}
    </Document>
  );
};

export default PdfDocument;
