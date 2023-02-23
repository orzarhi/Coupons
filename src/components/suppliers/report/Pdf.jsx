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
	image: {
		width: 70,
		height: 55,
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
		width: "50%",
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
		height: 24,
	},
	tableRowCell: {
		width: "50%",
		paddingHorizontal: 8,
		textAlign: "right",
		direction: "rtl",
		fontFamily: "Rubik",
		fontSize: 12,
	},
});

export const Pdf = ({ title, dates, data }) => {
	Font.register({
		family: "Rubik",
		src: RubikRegular,
	});

	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<View>
					<Image style={styles.image} src={logo} />
					<Text style={styles.heading}>{title}</Text>
					<Text style={styles.headingDates}>{dates}</Text>
					<Text style={styles.subtitle}>{data.length}סך הכל: </Text>

					<View style={styles.table}>
						<Text style={styles.tableHeader}>תאריך מימוש</Text>
						<Text style={styles.tableHeader}>מחיר</Text>
						<Text style={styles.tableHeader}>שם משתמש</Text>
					</View>
					{data?.map((report) => (
						<View key={report.usedDate} style={styles.tableRow}>
							<Text style={styles.tableRowCell}>
								{new Date(report.usedDate).toLocaleDateString()}
							</Text>
							<Text style={styles.tableRowCell}>
								₪{report.price}
							</Text>
							<Text style={styles.tableRowCell}>
								{report.usedUsername}
							</Text>
						</View>
					))}
					<Rect style={{ marginTop: 20 }} />
				</View>
			</Page>
		</Document>
	);
};
