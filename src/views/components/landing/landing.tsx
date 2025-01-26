
import { PrivacyHeader } from './privacy-header'
import {MeetCompanyon} from "src/views/pages/landing/meet-companyon";
import {MeetingsRedefined} from "src/views/pages/landing/meeting-redefined";
import {PremiumSection} from "src/views/pages/landing/section-premium";
import {PrivateItems} from "src/views/pages/landing/private-items";
import {FooterSection} from "src/views/pages/landing/footer-companyon";
import {Workspaces} from "src/views/pages/landing/section-workspaces";

export const LandingComp = () => {
    return (
        <div>
            <div className="landing-container">
                <PrivacyHeader />
                <MeetCompanyon />
                <Workspaces />
                <MeetingsRedefined />
            </div>
            <PremiumSection />
            <PrivateItems />
            <FooterSection />
        </div>
    )
}