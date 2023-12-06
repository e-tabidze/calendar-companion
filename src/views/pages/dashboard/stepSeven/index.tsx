import Radio from 'src/views/components/radio'
import Typography from 'src/views/components/typography'
import Divider from 'src/views/components/divider'
import FileUpload from 'src/views/components/fileUpload'

interface Props {
  control: any
}

const StepSeven: React.FC<Props> = ({ control }) => {
  const Insured = () => (
    <div className='flex flex-col gap-5 m-12'>
      <FileUpload title='სადაზღვევო პოლისი' description='ატვირთეთ დაზღვევის დამადასტურებელი დოკუმენტი' />
      <FileUpload title='სადაზღვევო პოლისი' description='ატვირთეთ დაზღვევის დამადასტურებელი დოკუმენტი' />
    </div>
  )

  const NonInsured = () => (
    <div>
      <div className='border border-raisin-10 rounded-xl p-10 max-h-60 overflow-y-auto mb-6'>
        <Typography type='h4' color='dark' className='text-center mb-4'>
          წესები და პირობები
        </Typography>
        <Typography type='body' color='light' className='line-clamp-3'>
          გავრცელებული მოსაზრებით, Lorem Ipsum შემთხვევითი ტექსტი სულაც არაა. მისი ფესვები ჯერკიდევ ჩვ. წ. აღ-მდე 45
          წლის დროინდელი კლასიკური ლათინური ლიტერატურიდან მოდის. ვირჯინიის შტატში მდებარე ჰემპდენ-სიდნეის კოლეჯის
          პროფესორმა რიჩარდ მაკკლინტოკმა აიღო ერთ-ერთი ყველაზე იშვიათი ლათინური სიტყვა consectetur Lorem Ipsum-პასაჟიდან
          და გადაწყვიტა მოეძებნა იგი კლასიკურ ლიტერატურაში. ძიება შედეგიანი აღმოჩნდა — ტექსტი Lorem Ipsum გადმოწერილი
          ყოფილა ციცერონის de Finibus Bonorum et Malorum -ის 1.10.32 და 1.10.33 თავებიდან. ეს წიგნი ეთიკის თეორიის
          ტრაქტატია, რომელიც რენესანსის პერიოდში ძალიან იყო გავრცელებული. Lorem Ipsum-ის პირველი ხაზი, Lorem ipsum dolor
          sit amet... სწორედ ამ წიგნის 1.10.32 თავიდანაა. მათთვის, ვისაც აინტერესებს, ქვევით მოყვანილია Lorem Ipsum-ის
          ორიგინალი ნაწყვეტი 1500-იანი წლებიდან. ასევე შეგიძლიათ ნახოთ 1.10.32 და 1.10.33 თავები ციცერონის de Finibus
          Bonorum et Malorum -დან, რომელსაც თან ერთვის 1914 წელს ჰ. რექჰამის შესრულებული ინგლისურენოვანი გავრცელებული
          მოსაზრებით, Lorem Ipsum შემთხვევითი ტექსტი სულაც არაა. მისი ფესვები ჯერკიდევ ჩვ. წ. აღ-მდე 45 წლის დროინდელი
          კლასიკური ლათინური ლიტერატურიდან მოდის. ვირჯინიის შტატში მდებარე ჰემპდენ-სიდნეის კოლეჯის პროფესორმა რიჩარდ
          მაკკლინტოკმა აიღო ერთ-ერთი ყველაზე იშვიათი ლათინური სიტყვა consectetur Lorem Ipsum-პასაჟიდან და გადაწყვიტა
          მოეძებნა იგი კლასიკურ ლიტერატურაში. ძიება შედეგიანი აღმოჩნდა — ტექსტი Lorem Ipsum გადმოწერილი ყოფილა ციცერონის
          de Finibus Bonorum et Malorum -ის 1.10.32 და 1.10.33 თავებიდან. ეს წიგნი ეთიკის თეორიის ტრაქტატია, რომელიც
          რენესანსის პერიოდში ძალიან იყო გავრცელებული. Lorem Ipsum-ის პირველი ხაზი, Lorem ipsum dolor sit amet... სწორედ
          ამ წიგნის 1.10.32 თავიდანაა. მათთვის, ვისაც აინტერესებს, ქვევით მოყვანილია Lorem Ipsum-ის ორიგინალი ნაწყვეტი
          1500-იანი წლებიდან. ასევე შეგიძლიათ ნახოთ 1.10.32 და 1.10.33 თავები ციცერონის de Finibus Bonorum et Malorum
          -დან, რომელსაც თან ერთვის 1914 წელს ჰ. რექჰამის შესრულებული ინგლისურენოვანი
        </Typography>
      </div>
      {/* <Checkbox label='წავიკითხე და ვეთანხმები წესებსა და პირობებს' value='' /> */}
    </div>
  )

  const options = [
    {
      label: 'ავტომობილი დაზღვეულია',
      value: 'ავტომობილი დაზღვეულია',
      children: (
        <div className='mb-12'>
          <Insured /> <Divider />
        </div>
      )
    },
    { label: 'ავტომობილი არ არის დაზღვეული ', value: 'ავტომობილი არ არის დაზღვეული', children: <NonInsured /> }
  ]

  return (
    <div className=''>
      <Typography type='h5'>ავტომობილის გასაქირავებლად სასურველია დაზღვევა</Typography>
      <Typography type='subtitle' color='light' className='my-8'>
        გთხოვთ მონიშნოთ გყავთ თუ არა ავტომობილი დაზღვეული. იმ შემთხვევაში თუ დაზღვეული არ გყავთ ავტომობილი,
        რეკომენდირებულია მისი დაზღვევა, რაც თავიდან აგაცილებთ შესაძლო გაუგებრობებ
      </Typography>
      <Radio name='name' options={options} control={control} color='bg-green-100' />
    </div>
  )
}

export default StepSeven
