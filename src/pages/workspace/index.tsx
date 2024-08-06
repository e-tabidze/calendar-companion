import authHOC from 'src/hoc/authHOC'
import WorkspacePage from 'src/views/pages/workspace'

const Workspace = () => {
  return <WorkspacePage />
}

export default authHOC(Workspace)
