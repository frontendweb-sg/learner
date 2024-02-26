import PageTitle from "@/components/common/PageTitle";
import Col from "@/components/ui/Col";
import Grid from "@/components/ui/Grid";
import SectionForm from "../../../components/SectionForm";
import Panel from "@/components/ui/Panel";
import Divider from "@/components/ui/Divider";

export default function Page({ params }: { params: { sectionId: string } }) {
	return (
		<Grid size={12}>
			<Col start={3} span={8}>
				<Grid size={12} gap={6}>
					<Col span={8}>
						<PageTitle title="Add course" subtitle="Welcome to add course" />
						<SectionForm courseSlug="slug" />
					</Col>
					<Col span={4}>
						<Panel>
							<h2>Publish</h2>
							<Divider />
							<div>Status: pending</div>
						</Panel>
					</Col>
				</Grid>
			</Col>
		</Grid>
	);
}
