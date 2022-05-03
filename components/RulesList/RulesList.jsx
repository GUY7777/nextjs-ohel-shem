import MuiAccordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import styles from "./RulesList.module.css";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

export default function RulesList() {
  return (
    <div className={styles.rules}>
      <Accordion dir="rtl" sx={{
          backgroundColor: "#e1e2eb",
        }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          className={styles.rules_titles}
        >
          <Typography component={'span'}>
            <h2 className={styles.rules_titles}>מבנה הקבוצה</h2>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={'span'}>
            <ol>
              <li>כל קבוצה מורכבת מ-5 שחקנים.</li>
              <li>
                בכל שבוע מחלקים בין ראשי הקבוצות את השחקנים שהגיעו (למעט את
                שחקני האלופה במידה וכולם הגיעו ורוצים להישאר שוב ביחד) במידה
                והקבוצה האלופה רוצה להתפרק שחקני הקבוצה נכנסים לסבב החלוקה.
              </li>
              <li>
                קבוצה אלופה שחסר לה שחקן (העדרות) תוכל לבחור שחקן אחר במקומו
                (באותה רמה) זאת במידה והגיעו לפחות 4 שחקנים מאותה אלופה. במידה
                והקבוצה תזכה שוב באליפות השחקן שנבחר ימשיך להיות עם הקבוצה
                האלופה השחקן שלא הגיע באותו שבוע לא יחזור לשורותם ויחזור לסבב
                הבחירה מחדש.
              </li>
            </ol>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion dir="rtl" sx={{
          backgroundColor: "#e1e2eb",
        }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography component={'span'}>
            <h2 className={styles.rules_titles}>הגרלה לקביעת העולות לשחק</h2>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={'span'}>
            <ol>
              <li>
                כל ראשי הקבוצות של אותו שבוע עורכים ביניהם הגרלה מי שתי הקבוצות
                שעולות לשחק ראשונות (הטלת קובייה , מארבע , זוג או פרד , וכו).
              </li>
              <li>
                במידה וקיימת הסכמה בין ראשי כל הקבוצות קבוצה המונה 6 שחקנים
                בשבוע שהגיעו 21-22 שחקנים יכולה לזכות לעדיפות ולעלות לשחק ראשונה
                (מותנה באישור כל ראשי הקבוצות!!!) במידה ואין הסכמה מבוצעת הגרלה
                בין כל ראשי הקבוצות מי הקבוצות שעולות לשחק ראשונות.
              </li>
              <li>
                קבוצות שממתינות בחוץ לשחק (במצב של 4 קבוצות) יבצעו הגרלה מי עולה
                לשחק (בהנחה שהמשחק ששוחק הסתיים בהכרעה) קבוצה שמנצחת עולה לשחק.
                במידה ויוצר מצב ששוב שתי הקבוצות ימתינו בחוץ הקבוצה שהפסידה
                בהגרלה בפעם הראשונה תעלה לשחק ללא הגרלה.
              </li>
            </ol>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion dir="rtl" sx={{
          backgroundColor: "#e1e2eb",
        }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography component={'span'}>
            <h2 className={styles.rules_titles}>חוקי המשחק</h2>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={'span'}>
            <ol>
              <li>כל משחק נערך בין שתי קבוצות למשך 10 דקות.</li>
              <li>
                ניצחון של אחת הקבוצות בתוצאה של 0-2 או 1-2 בפרק זמן הקצר מ-10
                דקות יביא לסיומו של המשחק.
              </li>
              <li>
                קבוצה שמנצחת ממשיכה לשחק גם במשחק הבא קבוצה שמפסידה יורדת
                וממתינה לתורה.
              </li>
              <li>
                תוצאת תיקו בסיום 10 דקות תגרום ליציאת שתי הקבוצות ששחקו (בתנאי
                שקיימות 4 קבוצות באותו שבוע).
              </li>
              <li>
                <b>
                  במצב שקיימות 2-3 קבוצות באותו שבוע המשחק יצטרך להסתיים בהכרעה:
                </b>
                <ul>
                  <li>במשך ה-10 דקות של המשחק.</li>
                  <li>הארכה בת 2 דקות.</li>
                  <li>
                    פנדלים (בשלב ראשון שתי פנדלים לכל קבוצה) במידה ולא תהיה
                    הכרעה פנדל בודד לכל קבוצה עד למצב של הכרעה.
                  </li>
                </ul>
              </li>
              <li>
                גבולות המגרש הם עד הגדרות בצד המזרחי (פגיעה בגדר שלא גרמה ליציאת
                הכדור דינה המשך משחק) כדור שיפגע בעמוד התאורה מעל גובה הגדר יחשב
                כדור חוץ, בצידו המערבי הגבול הוא עד הלבנים הלבנות (כדור שעובר את
                הלבנים הלבנות דינו חוץ!) כדור שיפגע בעמוד התאורה בכל מקום יחשב
                כדור חוץ. הגבולות של המגרש בצידו הצפוני והדרומי לפי קו הרוחב של
                המגרש.
              </li>
              <li>
                כל כדור שילכד מתחת לספסל השחקן הראשון שיגיע לכדור יוציא אותו ללא
                הפרעה של השחקן היריב (כל הפרעה של שחקן מהקבוצה היריבה יגרום
                לעבירת עונשין).
              </li>
              <li>כל נגיעת יד ברחבה מכוונת או לא מכוונת תגרום לפנדל.</li>
              <li>
                חל איסור של השוער לתפוס כדור ביד שהוחזר לו על ידי שחקן מקבוצתו
                (תפיסת הכדור בידי השוער תגרום עבירת עונשין במקום שנעברה העבירה).
              </li>
              <li>
                במידה ויהיו ארבע קבוצות מלאות (20 אנשים) שוער מקבוצה אחרת לא
                יוכל להיכנס לשער היריבה והשוער שיעמוד בשער יהיה חייב להיות מאותה
                קבוצה שמשחקת.
              </li>
              <li>
                כל ניצחון של קבוצה יעניק לה 3 נקודות תיקו 1 נקודות הפסד 0
                נקודות.
              </li>
              <li>
                בכל מקרה אלימות של הרמת ידיים השחקנים המעורבים יורחקו לשתי דקות!
              </li>
              <li>
                קבוצה שתורה לעלות לשחק תוכל להעביר את התור לקבוצה אחרת ולעלות
                במשחק לאחר מכן.
              </li>
              <li>
                קבוצה שתזכה במרבית הנקודות לאותו שבוע תוגדר קבוצה אלופה במידה
                ויהיו שתי קבוצות (או יותר) עם אותו מספר נקודות לא תהיה אלופה
                לאותו שבוע.
              </li>
            </ol>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion dir="rtl" sx={{
          backgroundColor: "#e1e2eb",
        }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography component={'span'}>
            <h2 className={styles.rules_titles}>שיפוט</h2>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={'span'}>
            <ol>
              <li>{'לכל משחק יקבע שופט המוסכם ע"י שתי הקבוצות שמשחקות.'}</li>
              <li>
                כל החלטה של השופט צריך לכבד אפילו שישנם אי הסכמות מצד הקבוצות
                (גם במידה ומדובר בהחלטה שגויה!)
              </li>
              <li>השופט אחראי על מדידת הזמן.</li>
              <li>
                {'באחריות השופט להתריע שנשאר דקה אחרונה לסיום המשחק ואותו כנ"ל גם'
               +' להתקפה אחרונה.'}
              </li>
              <li>כל כדור חוץ או קרן בהתקפה אחרונה יביא לסיומו של המשחק.</li>
            </ol>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion dir="rtl" sx={{
          backgroundColor: "#e1e2eb",
        }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography component={'span'}>
            <h2 className={styles.rules_titles}>משחק אחרון בשישי</h2>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={'span'}>
            <ol>
              <li>
                משחק אחרון בשישי (שעון קיץ) הוא עד השעה 19:00 (או בשעה אחרת לפי
                הסכמת הרוב) משחק אחרון שמתחיל לפני השעה 19:00 יגיע לסיומו החוקי
                ותוצאת המשחק תיחשב בניקוד הסופי.
              </li>
              <li>
                משחק אחרון בשישי (שעון חורף) הוא עד לכיבוי האורות שעה משוערת
                18:30.
              </li>
              <li>
                משחק אחרון הן בשעון קיץ והן בשעון חורף שלא הגיע לסיומו המלא
                הנקודות של משחק זה לא יחשבו לקבוצות המשחקות ולא יכללו בניקוד
                הסופי.
              </li>
            </ol>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion dir="rtl" sx={{
          backgroundColor: "#e1e2eb",
        }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography component={'span'}>
            <h2 className={styles.rules_titles}>הנהלה בכירה</h2>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={'span'}>
            <ol>
              <li>
                ההנהלה הבכירה תוכל לשנות ולעדכן את התקנון לפי החלטות שיתקבלו
                ויחייבו את עדכון התקנון.
              </li>
              <li>{'החלטה סופית בחילוקי דעות תינתן אך ורק ע"י ההנהלה הבכירה!'}</li>
            </ol>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
