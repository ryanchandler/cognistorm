import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import cookie from "react-cookies";
import { v4 as uuidv4 } from "uuid";
import { ArrowRight, MicFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectCookie: null,
      consented: false,
    };

    this.handleConsent = this.handleConsent.bind(this);
  }

  handleConsent(evt) {
    if (!cookie.load("subjectUUID")) {
      


      fetch(
        "https://16pjyerzdf.execute-api.us-east-1.amazonaws.com/dev/read?uid=0&directive=enroll" )
        .then((data) => data.json())
        .then((data) =>
          this.setState({
            
            subjectCookie: data.subjectCookie,
            trialID: 0,

          },
          cookie.save("subjectUUID", data.subjectCookie)
          )
          
        );
  
      
    }


    if (!cookie.load("currentTaskNumber")) {
      cookie.save("currentTaskNumber", 0)
    }





    this.setState(
      {
        consented: evt.target.checked,
      },
      () => console.log(this.state.consented)
    );
    console.log("consented");
  }

  render() {
    return (



      
      <div className="consent">
        <header className="App-header-short">
          <h1>Welcome</h1>
        </header>
        <div
          style={{
            margin: "50px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h4> We are excited that you have decided to participate.</h4>
<p></p>
<MicFill  size={80} />
<b> You will need to use a headset microphone and mouse to complete this task</b>
<br></br>
<b> Please use Google's Chrome browser to complete.</b>

<p></p>
          This is a research study being conducted by researchers from the
          University of Illinois. The goal of the study is to teach computers to
          recognize subtle differences in meaning based on how words are spoken
          (voiced, inflected).
          <p></p>
          You will be asked to speak either the word "yeah" or "uh-huh" into your
          computer's headset microphone with a different characterizartion, or attitude. For example you may
          be asked to say "uh-huh" as though you are very interesed or
          uninterested.
          <p></p>
          <b>
          Two main features of the study to consider are:</b>
          <ul>
            <li>
              Your voice will be recorded and stored and will be made public as
              a part of the research dataset.
            </li>
            <li>
              No personally identifiable information will tie the recordings to
              your identity
            </li>
          </ul>




<p></p><h3>
Consent for Participation in Social Behavioral Research
</h3>

<p></p>
<b>
STUDY TITLE:
Measuring the Effect of Verbal Cues on Empathy within a Human Computer Dialog</b>
<p></p>

You are being asked to participate in a research study. Researchers are required to provide a consent form such as this one to tell you about the research, to explain that taking part is voluntary, to describe the risks and benefits of participation, and to help you to make an informed decision. You should feel free to ask the researchers any questions you may have.

Principal Investigator Name and Title: Dr. Gary Dell

Department and Institution: Psychology Dept. University of Illinois, Urbana-Champaign

Address and Contact Information: 217-244-1294, gdell@illinois.edu

<p></p>
<b>Why am I being asked? </b>


You are being asked to be a subject in a research study that is attempting to test the effect of certain verbal feedback on creating empathy on the part of people interacting with computerized dialog systems.


You have been asked to participate in the research because it is essential to have human participants’ responses measured and assessed as they interact with the dialog system in a natural way. This allows the researchers to determine if changes to the computerized system make the experience better and more natural.


Your participation in this research is voluntary. Your decision whether or not to participate will not affect your current or future dealings with the University of Illinois at Urbana-Champaign. If you decide to participate, you are free to withdraw at any time without affecting that relationship.


Approximately 60 subjects may be involved in this research through the use of Amazon’s Mechanical Turk website, mturk.com.
<p></p>

<b>What is the purpose of this research? </b>


The goal of this research is to discover to what extent the addition of verbal feedback by these computerized devices affects a person’s perception of empathy with the system. These verbal cues could be simple filled pauses such as, “uh-huh” or statements like, “yeah.” The goal of the experiment is to measure the semantic (meaningful) content of verbal back-channels like “uh-huh” and “yeah”. Your participation will help researchers create more empathetic sounding digital assistant devices.
<p></p>
<b>What procedures are involved? </b>

This research will be performed via the Mechanical Turk website, mturk.com. The session will take approximately 25-35 minutes. The study procedures are:
Experiment #1: Study participants will be solicited for participation through the Mechanical Turk website, mturk.com. The participant will be provided a brief written overview of the task and be made aware that audio recordings will be made of their responses and that they may decline any question without explanations or negative repercussions. The participant will also see this consent form and be provided with an electronic signature field and a check box on the website to indicate consent .The subject will hear up to 120 statements through headphones. The subject will wear a headset microphone and will provide verbal responses of either “uh-huh” or “yeah” in response to each statement. The participant will be asked to modulate their response in a way that signals some level of interest, agreement, understanding, belief, concern etc. The participant will be shown a scale on the screen that places each utterance into a scale such as, “slightly interested”, “very interested”, “neutral”. The participant will attempt to produce a “uh-huh” or “yeah” that matches this level. Their responses will be recorded.
<p></p>

<b>What are the potential risks and discomforts?</b>

Your voice will be audio recorded and preserved for a minimum of 5 years as a part of this study.

The verbal feedback will not solicit private personal information or information that could in any way reasonably be expected to re-traumatize the subject. To the best of our knowledge, the things you will be doing have no more risk of harm than you would experience in everyday life.
<p></p>

<b>Are there benefits to taking part in the research?</b>
This study is not designed to benefit you directly. This study is designed to learn more about human-computer interaction. The study results may be used to help other people in the future. Understanding if the mechanisms by which human-computer dialog can be made more engaging through potentially empathy inducing verbal cues may allow researchers and engineers to design better human-computer interactions and experiences. The goal of making electronic agents which can provide companionship and empathy to people who are physically or socially isolated may be of considerable importance.
<p></p>
<b>What other options are there?</b>
<p></p>

You have the option to not participate in this study or discontinue the study at any time.
<p></p>

<b>Will my study-related information be kept confidential?</b>
Faculty, students, and staff who may see your information will maintain confidentiality to the extent of laws and university policies. Personal identifiers will not be published or presented. Anonymized recordings of “uh-huh” and “yeah” made by participants will be made publicly available on the Internet and will be used to promote and demonstrate this research. These recordings will be retained for an indefinite period of time.
<p></p>
<b>What are the costs for participating in this research? </b>


There are no costs to you for participating in this research.
<b>
  <p></p>
Will I be reimbursed for any of my expenses or paid for my participation in this research? 
</b>
<p></p>

You will receive payment for each of your completed human intelligence tasks as provided through the Mechanical Turk website. This amount may very from $.05 to $.50 per task and will be established prior to testing. If you do not finish the study, you will be compensated on a prorated basis for the portion of the study you have completed. 
<p></p>
<b>Can I withdraw or be removed from the study?</b>
<p></p>
If you decide to participate, you are free to withdraw your consent and discontinue participation at any time.
<p></p>

The Researchers also have the right to stop your participation in this study without your consent if they believe it is in your best interests.
<p></p>

In the event you withdraw or are asked to leave the study, you will still be compensated on pro rated basis.

<p></p>
<b>Who should I contact if I have questions?</b>
<p></p>
Contact the researchers Gary Dell at 217-244-1294, gdell@illinois or Ryan Chandler 217-855-2093, rchan8@illinois.edu
<p></p>
<b>What are my rights as a research subject?</b>
<p></p>
If you feel you have not been treated according to the descriptions in this form, or if you have any questions about your rights as a research subject, including questions, concerns, complaints, or to offer input, you may call the Office for the Protection of Research Subjects (OPRS) at 217-333-2670 or e-mail OPRS at irb@illinois.edu
<p></p>
<b>Remember:</b>
<p></p>

Your participation in this research is voluntary. Your decision whether or not to participate will not affect your current or future relations with the University. If you decide to participate, you are free to withdraw at any time without affecting that relationship.
<p></p>

I have read (or someone has read to me) the above information. I have been given an opportunity to ask questions and my questions have been answered to my satisfaction. I agree to participate in this research. I will be given a copy of this signed and dated form.
<p></p>
Browser cookies are used to track your progress through the testing.  You will need to allow cookies and consent to their use.


Person obtaining consent is Ryan Chandler, rchan8@illinois.edu. You may contact me via email with any questions or concerns.
         <p></p>
         
          <br></br><b>
          <Form>
            <Form.Group controlId="consent">

              <Form.Check
                type="checkbox"
                checked={this.state.consented}
                onChange={this.handleConsent}
                label="I consent to participate as described in the consent details above."
              />
            </Form.Group>
          </Form>
          </b>
          <br></br>
          <Link to="/HardwareTest">
            <ArrowRight  style={this.state.consented ? {} : { display: 'none' }}  size={80} />
          </Link>
        </div>
      </div>
    );
  }
}

export default Welcome;
