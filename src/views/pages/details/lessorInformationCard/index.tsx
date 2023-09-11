import Divider from 'src/views/components/divider'
import Image from 'src/views/components/image'
import Review from 'src/views/components/review'
import Typography from 'src/views/components/typography'

interface Props {
  id?: string
}

const LessorInformationCard = ({ id }: Props) => {
  return (
    <div className='bg-raisin-5 rounded-3xl pt-12 pl-11 pb-11 pr-20' id={id}>
      <Typography type='h3' className='mb-5 hidden lg:block'>
        ინფორმაცია გამქირავებელზე
      </Typography>
      <div className='flex gap-3 items-center mb-9 lg:hidden'>
        <Review review={4.89} size='normal' />
        <Typography type='subtitle'>206 შეფასება</Typography>
      </div>
      <Divider />

      <div className='flex gap-20 my-6 items-center'>
        <div className='flex items-center gap-4'>
          <Image src='/images/avatar.png' alt='' className='rounded-xl h-14 w-fit' />
          <div>
            <div className='flex items-center gap-3'>
              <Typography type='h5' weight='normal'>
                მარჩელო ლიპი
              </Typography>
              <Image src='/icons/verify.svg' alt='' />
            </div>
            <Typography type='body' color='light'>
              3 განცხადება
            </Typography>
          </div>
        </div>

        <div className='hidden lg:flex gap-3 items-center'>
          <Review review={4.89} size='normal' />
          <Typography type='subtitle'>206 შეფასება</Typography>
        </div>
      </div>
      <Typography type='subtitle'>
        ქართული ენა არის საქართველოს სახელმწიფო ენა, რაც სხვა ყველაფერთან ერთად,ნიშნავს რომ ნებისმიერი არაქართველი
        ვალდებულია ეცადოს მის შესწავლას, თუ იგი საქართველოს მოქალაქეა. ქართულ ენაზე ლაპარაკობს 4 მილიონამდე ადამიანი
        საქართველოს საზღვრებში. ასევე აზერბაიჯანის, თურქეთისა და ირანის ტეროტორიებზე გვხვდება ქართული ენის რამოდენიმე
        დიალექტი, რომლებსაც იქ მცხოვრები ეთნიკური ქართველები რამოდენიმე საუკუნის მანძილზე არსებობას უნარჩუნებენ.
        მიუხედავად იმისა, რომ ქართული ენა მცირე ერის სახელმწიფო ენაა, მისი ურთულესი ბგერების გაგება მთელი მსოფლიოს
        მასშგაბით შეიძლება. ამჟამად, ყველაზე ვრცელი ქართული დიასპორა რუსეთშია, შესაბამისად საქართველოს საზღვრებს გარეთ
        ყველაზე მეტი ხალხი ამ ქვეყანაში ლაპარაკობს ქართულად. I
      </Typography>
    </div>
  )
}

export default LessorInformationCard
