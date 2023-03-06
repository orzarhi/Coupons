import {
	Document,
	Font,
	Image,
	Page,
	Rect,
	StyleSheet,
	Text,
	View,
} from "@react-pdf/renderer";
import RubikRegular from "~/assets/fonts/Rubik-Regular.ttf";
import logo from "~/assets/images/zemach-logo.jpg";

const styles = StyleSheet.create({
	page: {
		paddingTop: 30,
		paddingBottom: 60,
		paddingHorizontal: 50,
	},
	image: {
		width: 70,
		height: 55,
	},
	heading: {
		fontSize: 20,
		marginBottom: 20,
		textDecoration: "underline",
		textAlign: "center",
		direction: "rtl",
		fontFamily: "Rubik",
	},
	headingDates: {
		fontSize: 15,
		textAlign: "center",
		direction: "rtl",
		fontFamily: "Rubik",
	},
	subtitle: {
		fontSize: 15,
		marginBottom: 20,
		textAlign: "left",
		direction: "rtl",
		fontFamily: "Rubik",
	},
	table: {
		flexDirection: "row",
		borderBottomWidth: 1,
		borderColor: "#bfbfbf",
		alignItems: "center",
		textAlign: "right",
		direction: "rtl",
		fontFamily: "Rubik",
	},
	tableHeader: {
		width: "25%",
		borderRightWidth: 1,
		paddingHorizontal: 8,
		backgroundColor: "#DDDDDD",
		fontSize: 14,
	},
	tableRow: {
		flexDirection: "row",
		borderBottomWidth: 1,
		borderColor: "#bfbfbf",
		alignItems: "center",
		height: "auto",
	},
	tableRowCell: {
		width: "25%",
		paddingHorizontal: 8,
		textAlign: "right",
		direction: "rtl",
		fontFamily: "Rubik",
		fontSize: 10,
	},
});

export const Pdf = ({ title, data, dates }) => {
	Font.register({
		family: "Rubik",
		src: RubikRegular,
	});

	const totalPriceSupplier = data
		?.map((d) => d.supplierPrice)
		.reduce((partialSum, a) => partialSum + a, 0);

	const totalPriceEmployee = data
		?.map((d) => d.debitAmount)
		.reduce((partialSum, a) => partialSum + a, 0);
	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<View>
					<Image style={styles.image} src={logo} />
					<Text style={styles.heading}>{title}</Text>
					<Text style={styles.headingDates}>טווח תאריכים</Text>
					<Text style={styles.headingDates}>{dates}</Text>
					<Text style={styles.subtitle}>{data.length}סך הכל: </Text>
					<View style={styles.table}>
						<Text style={styles.tableHeader}>מחיר עובד</Text>
						<Text style={styles.tableHeader}>מחיר ספק</Text>
						<Text style={styles.tableHeader}>ספק</Text>
						<Text style={styles.tableHeader}>מימוש</Text>
						<Text style={styles.tableHeader}>שם עובד</Text>
						<Text style={styles.tableHeader}>קוד עובד</Text>
					</View>
					{data?.map((report) => (
						<View key={report.usedDate} style={styles.tableRow}>
							<Text style={styles.tableRowCell}>
								₪{report.debitAmount}
							</Text>
							<Text style={styles.tableRowCell}>
								₪{report.supplierPrice}
							</Text>

							<Text style={styles.tableRowCell}>
								{report.supplierName}
							</Text>

							<Text style={styles.tableRowCell}>
								{new Date(report.usedDate).getFullYear() >
									2000 &&
									new Date(
										report.usedDate
									).toLocaleDateString() +
										"\n" +
										report.usedDate.slice(11, 16)}
							</Text>

							<Text style={styles.tableRowCell}>
								{report.employeeName}
							</Text>

							<Text style={styles.tableRowCell}>
								{report.employeeCode}
							</Text>
						</View>
					))}
					<Rect style={{ marginTop: 20 }} />
					<Text style={styles.subtitle}>
						₪{totalPriceSupplier} סכום ספקים:
					</Text>
					<Text style={styles.subtitle}>
						₪{totalPriceEmployee} סכום עובדים:
					</Text>
				</View>
			</Page>
		</Document>
	);
};
