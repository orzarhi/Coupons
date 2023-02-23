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
import { useEffect, useState } from "react";
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
		height: 24,
	},
	tableRowCell: {
		width: "25%",
		paddingHorizontal: 8,
		textAlign: "right",
		direction: "rtl",
		fontFamily: "Rubik",
		fontSize: 12,
	},
});

export const Pdf = ({ title, data, dates }) => {
	Font.register({
		family: "Rubik",
		src: RubikRegular,
	});

	const [countIsUsed, setCountIsUsed] = useState(0);

	useEffect(() => {
		data?.map((coupon) => {
			if (coupon.isUsed) {
				setCountIsUsed((prev) => prev + 1);
			}
		});
	}, []);

	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<View>
					<Image style={styles.image} src={logo} />
					<Text style={styles.heading}>{title}</Text>
					<Text style={styles.headingDates}>{dates}</Text>
					<Text style={styles.subtitle}>{data.length}סך הכל: </Text>
					<Text style={styles.subtitle}>
						{countIsUsed} סך הכל מימושים:
					</Text>
					<View style={styles.table}>
						<Text style={styles.tableHeader}>תאריך מימוש</Text>
						<Text style={styles.tableHeader}>שם ספק</Text>
						<Text style={styles.tableHeader}>קופון</Text>
						<Text style={styles.tableHeader}>קוד עובד</Text>
					</View>
					{data?.map((report) => (
						<View key={report.id} style={styles.tableRow}>
							<Text style={styles.tableRowCell}>
								{new Date(report.usedDate).getFullYear() >
									2000 &&
									new Date(
										report.usedDate
									).toLocaleDateString()}
							</Text>
							<Text style={styles.tableRowCell}>
								{report.supplierName
									? report.supplierName
									: "לא מומש"}
							</Text>
							<Text style={styles.tableRowCell}>
								{report.couponName}
							</Text>
							<Text style={styles.tableRowCell}>
								{report.employeeCode}
							</Text>
						</View>
					))}
					<Rect style={{ marginTop: 20 }} />
				</View>
			</Page>
		</Document>
	);
};
