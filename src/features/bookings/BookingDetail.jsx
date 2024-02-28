import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { HiArrowUpOnSquare } from "react-icons/hi2";

import Row from "../../ui/Row";
import Tag from "../../ui/Tag";
import Modal from "../../ui/Modal";
import Empty from "../../ui/Empty";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import ButtonText from "../../ui/ButtonText";
import ButtonGroup from "../../ui/ButtonGroup";
import ConfirmDelete from "../../ui/ConfirmDelete";
import BookingDataBox from "./BookingDataBox";
import { useBooking } from "./useBooking";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useDeleteBooking } from "./useDeleteBooking";
import { useCheckout } from "../check-in-out/useCheckout";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  if (!booking) return <Empty resource="booking" />;

  const { status, id } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button
            $variation="primary"
            onClick={() => navigate(`/checkin/${id}`)}
          >
            Check in
          </Button>
        )}

        {status === "checked-in" && (
          <Button
            $icon={<HiArrowUpOnSquare />}
            onClick={() => checkout(id)}
            disabled={isCheckingOut}
          >
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete">
            <Button $variation="danger">Delete booking</Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              disabled={isDeleting}
              onConfirm={() => {
                deleteBooking(id);
                moveBack();
              }}
            />
          </Modal.Window>
        </Modal>

        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
