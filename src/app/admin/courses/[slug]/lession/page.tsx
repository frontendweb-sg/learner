import PageTitle from "@/components/common/PageTitle";
import Col from "@/components/ui/Col";
import Grid from "@/components/ui/Grid";

type Params = {
	slug: string;
};
export default function Page({ params }: { params: Params }) {
	return (
		<>
			<Grid size={12}>
				<Col start={3} span={8}>
					<PageTitle title="Add lession" subtitle="Welcome to add course" />
					<Grid size={12} gap={6}>
						<Col span={8}></Col>
						<Col span={4} className="space-y-4"></Col>
					</Grid>
				</Col>
			</Grid>
		</>
	);
}
