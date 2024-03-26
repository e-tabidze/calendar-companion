import { ChangeEvent } from 'react'
import dynamic from 'next/dynamic'
import {useTranslation} from "next-i18next";

const Typography = dynamic(() => import('src/views/components/typography'), { ssr: false })
const Divider = dynamic(() => import('src/views/components/divider'), { ssr: false })
const Radio = dynamic(() => import('src/views/components/radio'), { ssr: false })
const FileUpload = dynamic(() => import('src/views/components/fileUpload'), { ssr: false })

interface Props {
  control: any
}

const StepSeven: React.FC<Props> = ({ control }) => {
  const {t} = useTranslation()
  const Insured = () => (
    <div className='flex flex-col gap-5 m-12'>
      <FileUpload
        title={t('insurance_police')}
        description={t('upload_insurance_document')}
        onChange={function (event: ChangeEvent<HTMLInputElement>): void {
          console.log(event)
          throw new Error('Function not implemented.')
        }}
        handleDelete={function (): void {
          throw new Error('Function not implemented.')
        }}
        value={undefined}
      />
      <FileUpload
          title={t('insurance_police')}
          description={t('upload_insurance_document')}
        onChange={function (event: ChangeEvent<HTMLInputElement>): void {
          console.log(event)
          throw new Error('Function not implemented.')
        }}
        handleDelete={function (): void {
          throw new Error('Function not implemented.')
        }}
        value={undefined}
      />
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
      label: t('car_insured'),
      value: t('car_insured'),
      children: (
        <div className='mb-12'>
          <Insured /> <Divider />
        </div>
      )
    },
    {
        label: t('car_not_insured'),
        value: t('car_not_insured'),
        children: <NonInsured /> }
  ]

  return (
    <div className=''>
      <Typography type='h5'>{t('car_should_insured')}</Typography>
      <Typography type='subtitle' color='light' className='my-8'>
          {t('insurance_desc')}
      </Typography>
      <Radio name='name' options={options} control={control} color='bg-green-100' />
    </div>
  )
}

export default StepSeven
