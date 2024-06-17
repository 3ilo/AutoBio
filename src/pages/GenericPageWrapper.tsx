import './styles/GenericPageWrapper.css';

import { ReactNode } from 'react';

interface GenericPageWrapperProps {
    page: ReactNode
}

const GenericPageWrapper = (props: GenericPageWrapperProps) => (
    <div className="commonPage">
      {props.page}
    </div>
  )

export { GenericPageWrapper }
export type { GenericPageWrapperProps }