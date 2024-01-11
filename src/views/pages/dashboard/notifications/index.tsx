import useNotifications from 'src/hooks/useNotifications'
import { useRouter } from 'next/router'
import ListItem from 'src/views/components/notifications/listItem'
import Details from 'src/views/components/notifications/details'
import { useEffect } from 'react'
import Typography from 'src/views/components/typography'
import DataPlaceHolder from 'src/views/components/dataPlaceholder'

const Notifications = () => {
  const { notifictions, refetchNotifications, notificationsLoading } = useNotifications()

  const router = useRouter()
  const { id, company } = router.query

  useEffect(() => {
    refetchNotifications()
  }, [router.asPath, id, company])

  if (notificationsLoading) {
    return <div>Loading</div>
  }

  return (
    <>
      {router.query.id ? (
        <Details url='/dashboard/notifications' id={String(id)} company={String(company)} />
      ) : (
        <div className='md:p-8 lg:p-10 md:border border-raisin-10 rounded-3xl mt-8 lg:mt-0'>
          <Typography type='h3' className='mb-6'>
            შეტყობინებები
          </Typography>
          <ul>
            {notifictions?.length > 0 ? (
              notifictions?.map((notification: any) => (
                <ListItem
                  url={`/dashboard/notifications/?id=${notification?.id}&company=${notification?.data?.company_id}`}
                  notification={notification}
                  key={notification?.id}
                />
              ))
            ) : (
              <DataPlaceHolder label='შეტყობინებები ჯერ არ გაქვს' />
            )}
          </ul>
        </div>
      )}
    </>
  )
}

export default Notifications
