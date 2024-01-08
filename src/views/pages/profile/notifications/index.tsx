import useNotifications from 'src/hooks/useNotifications'
import { useRouter } from 'next/router'
import ListItem from 'src/views/components/notifications/listItem'
import Details from 'src/views/components/notifications/details'
import { useEffect } from 'react'
import Typography from 'src/views/components/typography'

const Notifications = () => {
  const { notifictions, refetchNotifications } = useNotifications()

  const router = useRouter()
  const { id, company } = router.query

  useEffect(() => {
    refetchNotifications()
  }, [router.asPath, id, company])

  return (
    <>
      {router.query.id ? (
        <Details url='/profile/notifications' id={String(id)} company={String(company)} />
      ) : (
        <div className='md:p-8 lg:p-10 md:border border-raisin-10 rounded-3xl mt-8 lg:mt-0'>
          <Typography type='h3' className='mb-6'>
            შეტყობინებები
          </Typography>
          <ul>
            {notifictions?.map((notification: any) => (
              <ListItem
                url={`/profile/notifications/?id=${notification?.id}&company=${notification?.data?.company_id}`}
                notification={notification}
                key={notification?.id}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default Notifications
