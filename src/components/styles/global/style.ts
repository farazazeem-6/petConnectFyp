import { Text } from "@/components/elements";
import { styled } from "@/theme";

export const MainHeading = styled(Text, {
    fontSize: '$fontSize$display',
    fontWeight: '$fontWeight$black',
    color: '$black !important',
    lineHeight: '1 !important',

    '@md_max': {
        fontSize: '$fontSize$xxxl',
    },
    '@sm_max': {
        fontSize: '$px$22',
    },
});

export const MainSubHeading = styled(Text, {
    fontSize: '$fontSize$md',
    fontWeight: '$fontWeight$light',
    color: '$secondryHeading !important',
    textAlign: 'center',
    mt: '$px$8',
    mb: '$px$40',

    '@md_max': {
        mb: '$px$32',
    },
    '@sm_max': {
        fontSize: '$fontSize$sm',
        mb: '$px$24',
    },
});
