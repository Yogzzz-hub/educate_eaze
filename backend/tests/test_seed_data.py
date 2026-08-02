from app.seed.seed_data import build_demo_payload


def test_build_demo_payload_contains_expected_entities() -> None:
    payload = build_demo_payload()

    assert payload['university']['name'] == 'Northbridge State University'
    assert len(payload['colleges']) == 1
    assert len(payload['faculty']) == 2
    assert len(payload['students']) == 10
    assert len(payload['subjects']) == 3
    assert len(payload['exams']) == 1
