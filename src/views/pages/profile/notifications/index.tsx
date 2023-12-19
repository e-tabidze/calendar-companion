import useNotifications from 'src/hooks/useNotifications'
import { useRouter } from 'next/router'
import Header from 'src/views/components/notifications/header'
import ListItem from 'src/views/components/notifications/listItem'
import Details from 'src/views/components/notifications/details'
import { useEffect } from 'react'

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
        <div className='border border-raisin-10 rounded-2xl md:rounded-3xl p-6 md:py-10 md:px-8'>
          <Header />
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
